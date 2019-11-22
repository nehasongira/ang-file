package com.stackroute.multicasting.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User {

    private  int userId;
    private  String firstName;
    private  String lastName;
    private  String emailId;
    private  String departmentId;
    private  String profilePic;
    private  int teamId;

}
