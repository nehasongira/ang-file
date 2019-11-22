package com.stackroute.multicasting.controller;


import com.stackroute.multicasting.domain.Group;
import com.stackroute.multicasting.domain.Message;
import com.stackroute.multicasting.domain.User;
import com.stackroute.multicasting.services.MessageServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;

@Controller
@CrossOrigin
public class MessageController {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private MessageServiceImplementation messageService;

    @GetMapping("/usersList")
    public ResponseEntity<List<User>> getUsers(){
        return new ResponseEntity<>(this.messageService.getAllUsers(), HttpStatus.OK);
    }

    @MessageMapping("/login")
    public void login(@Payload User user){
        template.convertAndSend("/message/groupList/" + user.getUserId(),messageService.findUserGroups(user.getUserId()));
        template.convertAndSend("/message/" + user.getUserId() , messageService.findAllMessages(user.getUserId()));
    }

    @MessageMapping("/chat.sendMessage/{fromId}/{toId}")
    @SendTo("/message/{toId}")
    public Message sendMessage(@DestinationVariable int fromId,@DestinationVariable int toId,@Payload Message message){
        this.messageService.saveMessage(message);
        return message;
    }

//    @MessageMapping("/chat.sendFile/{fromId}/{toId}")
//    @SendTo("/message/file/{toId}")
//    public Message sendMessage(@DestinationVariable int fromId,@DestinationVariable int toId,@Payload File file){
//       // this.messageService.saveFile(file);
//        return file;
//    }

    @MessageMapping("/chat.groupMessage/{groupId}")
    public void groupMessage(@DestinationVariable int groupId,@Payload Message message){
        this.messageService.saveMessage(message);
        List<Integer> userIds = messageService.findMembersOfGroup(groupId);
        for(int userId:userIds){
            template.convertAndSend("/message/"+userId, message);
        }
    }

//    @MessageMapping("/chat.groupFile/{groupId}")
//    public void groupMessage(@DestinationVariable int groupId,@Payload File file){
////        this.messageService.saveFile(file);
////        List<Integer> userIds = messageService.findMembersOfGroup(groupId);
//        for(int userId:userIds){
//            template.convertAndSend("/message/file"+userId, file);
//        }
//    }

    @MessageMapping("/chat.newGroup")
    public void createGroup(@Payload Group group){
        this.messageService.addGroup(group);
        template.convertAndSend("/message/groupList/"+group.getUserId(),group);
    }

    @GetMapping("/usersList/{groupId}")
    public ResponseEntity<List<Integer>> getUsersOfGroup(@PathVariable int groupId){
        return new ResponseEntity<>(this.messageService.findMembersOfGroup(groupId),HttpStatus.OK);
    }

//    @MessageMapping("/chat.newUser")
//    @SendTo("/message/users")
//    public List<User> addUser(@Payload String name){
//        userRepository.save(new User(name));
//        List<User> user = new ArrayList<>();
//        userRepository.findAll().forEach(user::add);
//        template.convertAndSend("/message/allGroups",groupInterface.distinctGroup().toArray());
//        template.convertAndSend("/message/groupList/"+name,groupInterface.distinctGroupForUser(name).toArray());
//        return user;
//    }
}
