package com.lit.carpooling.rest.services;

import com.lit.carpooling.rest.model.Car;
import com.lit.carpooling.rest.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.*;
import static org.springframework.http.ResponseEntity.noContent;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/people")
public class PersonService {
    @Autowired
    private List<Person> people;

    @GetMapping(produces = "application/json")
    public ResponseEntity<List<Person>> allPeople(){
      if(people.isEmpty()) {
        return notFound().build();
      }
      return ok(people);
    }
  @GetMapping(value = "/byId/{id}", produces = "application/json")
  public ResponseEntity<Person> peopleById(@PathVariable int id) {
    return people.stream()
      .filter(person -> person.getId() == id)
      .findFirst()
      .map(ResponseEntity::ok)
      .orElseGet(() -> notFound().build());
  }

  @PostMapping(consumes = "application/json")
  public ResponseEntity<String> addPerson(@RequestBody Person newPerson) {
    if(people.stream().anyMatch(person -> person.getId() == newPerson.getId())) {
      return badRequest()
        .body("Already a person with id: " + newPerson.getId());
    }
    people.add(newPerson);
   // return noContent().build();
    return new ResponseEntity<String>("POST Person Response Ok", HttpStatus.OK);
  }

  @PutMapping(consumes = "application/json")
  public ResponseEntity<String> updatePerson(@RequestBody Person newPerson) {
    if(people.stream().noneMatch(person -> person.getId() == newPerson.getId())) {
      return badRequest()
        .body("Update stopped, No person has the ID: " + newPerson.getId());
    }
    people = people.stream()
      .map(person -> person.getId() != newPerson.getId() ? person : newPerson)
      .collect(Collectors.toList());
    return new ResponseEntity<String>("PUT Person Response Ok", HttpStatus.OK);
  }

}
