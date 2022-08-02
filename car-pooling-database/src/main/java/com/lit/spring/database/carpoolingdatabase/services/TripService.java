package com.lit.spring.database.carpoolingdatabase.services;

import com.lit.spring.database.carpoolingdatabase.TripRepository;
import com.lit.spring.database.carpoolingdatabase.entities.Car;
import com.lit.spring.database.carpoolingdatabase.entities.Person;
import com.lit.spring.database.carpoolingdatabase.entities.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import static java.util.stream.Collectors.toList;
import static org.springframework.http.ResponseEntity.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/trips")
public class TripService {
  @Autowired
  private TripRepository tripRepository;

  private List<Trip> trips = new ArrayList<Trip>();
  @GetMapping(produces = "application/json")
  public ResponseEntity<List<Trip>> allTrips(){
    if(trips.isEmpty()){
      tripRepository.findAll().forEach(trips :: add);
    }
    if(trips.isEmpty()) {
      return notFound().build();
    }
    return ok(trips);
  }

  @GetMapping(value = "/byId/{id}", produces = "application/json")
  public ResponseEntity<Trip> tripsById(@PathVariable int id) {
    return tripRepository.findById(id)
      .map(ResponseEntity::ok)
      .orElseGet(() -> notFound().build());
  }
  @GetMapping(value = "/byPersonId/{id}", produces = "application/json")
  public ResponseEntity<List<Trip>> tripsByPersonId(@PathVariable int id) {
    return filterTripsToResponse(trip -> trip.getPersonId() == id);
  }
  @PostMapping(consumes = "application/json")
  public ResponseEntity<String> addTrip(@RequestBody Trip newTrip) {
    if(trips.isEmpty()){
      tripRepository.findAll().forEach(trips :: add);
    }
    if(trips.stream().anyMatch(trip -> trip.getId() == newTrip.getId())) {
      return badRequest()
        .body("Already a trip with id: " + newTrip.getId());
    }
    trips.add(newTrip);
    tripRepository.save(newTrip);
    return new ResponseEntity<String>("POST Trip Response Ok", HttpStatus.OK);
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<String> deleteTrip(@PathVariable("id") int id) {
    if(trips.stream().noneMatch(trip -> trip.getId() == id)) {
      return badRequest()
        .body("Update stopped, No Trip has the ID: " + id);
    }
    tripRepository.deleteById(id);
    trips.clear();
    return new ResponseEntity<String>("DELETE Trip Response Ok", HttpStatus.OK);
  }
  private ResponseEntity<List<Trip>> filterTripsToResponse(Predicate<Trip> predicate) {
    var results = filterTripsToList(predicate);
    if (results.isEmpty()) {
      return notFound().build();
    }
    return ok(results);
  }
  private List<Trip> filterTripsToList(Predicate<Trip> predicate) {
    if(trips.isEmpty()){
      tripRepository.findAll().forEach(trips :: add);
    }
    return trips.stream().filter(predicate).collect(toList());
  }
}
