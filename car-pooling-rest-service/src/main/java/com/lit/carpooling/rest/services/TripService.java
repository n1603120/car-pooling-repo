package com.lit.carpooling.rest.services;

import com.lit.carpooling.rest.model.Person;
import com.lit.carpooling.rest.model.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.noContent;

@RestController
  @CrossOrigin(origins = "*")
  @RequestMapping("/trips")
  public class TripService {
    @Autowired
    private List<Trip> trips;
    @GetMapping(produces = "application/json")
    public List<Trip> allTrips(){
      return trips;
    }
    @PostMapping(consumes = "application/json")
    public ResponseEntity<String> addTrip(@RequestBody Trip newTrip) {
      if(trips.stream().anyMatch(trip -> trip.getId() == newTrip.getId())) {
        return badRequest()
          .body("Already a car with id: " + newTrip.getId());
      }
      trips.add(newTrip);
      return noContent().build();
    }
  }
