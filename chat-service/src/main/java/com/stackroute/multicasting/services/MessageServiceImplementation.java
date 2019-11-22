package com.stackroute.multicasting.services;


import com.stackroute.multicasting.domain.Group;
import com.stackroute.multicasting.domain.Message;
import com.stackroute.multicasting.domain.User;
import com.stackroute.multicasting.repository.GroupRepository;
import com.stackroute.multicasting.repository.MessageRepository;
import com.stackroute.multicasting.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageServiceImplementation implements MessageService{

    private GroupRepository groupRepository;
    private MessageRepository messageRepository;
    private UserRepository userRepository;
//    private FileRepository fileRepository;

    @Autowired
    public MessageServiceImplementation(GroupRepository groupRepository, MessageRepository messageRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
//        this.fileRepository=fileRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public Message saveMessage(Message message) {
        return this.messageRepository.save(message);
    }

//    @Override
//    public File saveFile(File file) {
//        return this.fileRepository.save(file);
//    }

    @Override
    public List<Integer> findMembersOfGroup(int groupId) {
        List<Group> groupParticipants= this.groupRepository.findByGroupId(groupId);
        List<Integer> users = new ArrayList<>();
        for(Group group:groupParticipants){
               users.add(group.getUserId());
        }
        return users;
    }

    @Override
    public Group addGroup(Group group) {
        return this.groupRepository.save(group);
    }

    @Override
    public List<Group> findAllGroups() {
        return this.groupRepository.findAll();
    }

    @Override
    public List<Group> findUserGroups(int userId) {
        return this.groupRepository.findByUserId(userId);
    }

    @Override
    public List<Message> findAllMessages(int fromId) {
        List<Message> messageList = this.messageRepository.findByFromIdOrToId(fromId, fromId);
        for(Group group:this.groupRepository.findByUserId(fromId)){
            messageList.addAll(this.messageRepository.findBytoId(group.getGroupId(),fromId));
        }
        return messageList;
    }

}
