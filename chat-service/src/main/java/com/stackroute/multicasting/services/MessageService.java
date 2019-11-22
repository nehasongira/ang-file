package com.stackroute.multicasting.services;

import com.stackroute.multicasting.domain.Group;
import com.stackroute.multicasting.domain.Message;
import com.stackroute.multicasting.domain.User;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.List;


public interface MessageService{

    List<User> getAllUsers();

    Message saveMessage(Message message);

//    File saveFile(File file);

    List<Integer> findMembersOfGroup(int groupId);

    Group addGroup(Group group);

    List<Group> findAllGroups();

    List<Group> findUserGroups(int userId);

    List<Message> findAllMessages(int fromId);
}
