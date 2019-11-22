package com.stackroute.multicasting.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class File {
    @Id
    private Long fileId;
    private int fromId;
    private int toId;
    private String content;
    private String ext1;
    private String fileName1;

}