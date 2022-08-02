package com.lit.spring.database.carpoolingdatabase.services;

import com.lit.spring.database.carpoolingdatabase.PersonRepository;
import com.lit.spring.database.carpoolingdatabase.entities.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.*;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/people")
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    private List<Person> people = new ArrayList<Person>();

    @GetMapping(produces = "application/json")
    public ResponseEntity<List<Person>> allPeople(){
      if(people.isEmpty()){
          personRepository.findAll().forEach(people :: add);
      }
      if(people.isEmpty()) {
        return notFound().build();
      }
      return ok(people);
    }
  @GetMapping(value = "/byId/{id}", produces = "application/json")
  public ResponseEntity<Person> peopleById(@PathVariable int id) {
    return personRepository.findById(id)
      .map(ResponseEntity::ok)
      .orElseGet(() -> notFound().build());
  }

  @PostMapping(consumes = "application/json")
  public ResponseEntity<String> addPerson(@RequestBody Person newPerson) {
    if(people.isEmpty()){
      personRepository.findAll().forEach(people :: add);
    }
    if(people.stream().anyMatch(person -> person.getId() == newPerson.getId())) {
      return badRequest()
        .body("Already a person with id: " + newPerson.getId());
    }
    people.add(newPerson);
    personRepository.save(newPerson);
    return new ResponseEntity<String>("POST Person Response Ok", HttpStatus.OK);
  }

  @PutMapping(consumes = "application/json")
  public ResponseEntity<String> updatePerson(@RequestBody Person newPerson) {
    if(people.isEmpty()){
      personRepository.findAll().forEach(people :: add);
    }
    if(people.stream().noneMatch(person -> person.getId() == newPerson.getId())) {
      return badRequest()
        .body("Update stopped, No person has the ID: " + newPerson.getId());
    }
    personRepository.save(newPerson);
    people.clear();
    return new ResponseEntity<String>("PUT Person Response Ok", HttpStatus.OK);
  }
  @DeleteMapping(value = "/{id}")
  public ResponseEntity<String> deletePerson(@PathVariable("id") int id) {
    if(people.stream().noneMatch(person -> person.getId() == id)) {
      return badRequest()
        .body("Update stopped, No person has the ID: " + id);
    }
    personRepository.deleteById(id);
    people.clear();
    return new ResponseEntity<String>("DELETE Person Response Ok", HttpStatus.OK);
  }
}
