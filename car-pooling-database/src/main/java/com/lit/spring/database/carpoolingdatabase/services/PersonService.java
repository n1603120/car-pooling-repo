package com.lit.spring.database.carpoolingdatabase.services;

import com.lit.spring.database.carpoolingdatabase.PersonRepository;
import com.lit.spring.database.carpoolingdatabase.entities.Car;
import com.lit.spring.database.carpoolingdatabase.entities.Person;
import com.lit.spring.database.carpoolingdatabase.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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
    if(people.stream().anyMatch(person -> Objects.equals(person.getEmail(), newPerson.getEmail()))) {
      return badRequest()
        .body("Already a person with email: " + newPerson.getEmail());
    }
    personRepository.save(newPerson);
    people.add(newPerson);
    return new ResponseEntity<String>("POST Person Response Ok", HttpStatus.OK);
  }

  @PutMapping(value = "/{id}", consumes = "application/json")
  public ResponseEntity<String> updatePerson(@PathVariable int id, @RequestBody Person updatedPerson) {
    Person personFound = personRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Person does not exist with id: " + id));
    personFound.setFirstName(updatedPerson.getFirstName());
    personFound.setLastName(updatedPerson.getLastName());
    personFound.setEmail(updatedPerson.getEmail());
    personFound.setPhoneNumber(updatedPerson.getPhoneNumber());
    personFound.setPostcode(updatedPerson.getPostcode());
    personFound.setPersonPassword(updatedPerson.getPersonPassword());

    personRepository.save(personFound);
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
