package com.lit.carpooling.rest.services;

import com.lit.carpooling.rest.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/people")
public class PersonService {
    @Autowired
    private List<Person> people;

    @GetMapping(produces = "application/json")
    public List<Person> allPeople(){
      return people;
    }
}
