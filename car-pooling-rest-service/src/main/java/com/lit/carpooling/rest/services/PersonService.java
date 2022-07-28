package com.lit.carpooling.rest.services;

import com.lit.carpooling.rest.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

  @PostMapping(consumes = "application/json")
  public ResponseEntity<String> addPerson(@RequestBody Person newPerson) {
    if(people.stream().anyMatch(person -> person.getId() == newPerson.getId())) {
      return badRequest()
        .body("Already a person with id: " + newPerson.getId());
    }
    people.add(newPerson);
    return noContent().build();
  }
}
