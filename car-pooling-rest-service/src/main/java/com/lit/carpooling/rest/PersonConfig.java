package com.lit.carpooling.rest;

import com.lit.carpooling.rest.model.Person;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class PersonConfig {
  @Bean
  public List<Person> buildPeople(){
    var people = List.of(
      new Person(1, "Mark", "Millsopp", "mark.millsopp@gmail.com", "07711019490", "BT514DS", "Password1!"),
      new Person(2, "Jamie", "Mitchell", "Jamie.Mitchell@gmail.com", "07757479494", "BT514DS", "Password1!"),
      new Person(3, "Robyn", "Lyttle", "Robyn.Lyttle@gmail.com", "07747289497", "BT514DS", "Password1!"),
      new Person(4, "Emma", "Johnson", "Emma.Johnson@gmail.com", "07724569498", "BT514DS", "Password1!")
    );
    return new ArrayList<>(people);
  }
}
