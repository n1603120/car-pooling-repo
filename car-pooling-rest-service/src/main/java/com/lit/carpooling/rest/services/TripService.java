package com.lit.carpooling.rest.services;

import com.lit.carpooling.rest.model.Car;
import com.lit.carpooling.rest.model.Person;
import com.lit.carpooling.rest.model.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/trips")
public class TripService {
  @Autowired
  private List<Trip> trips;
  @GetMapping(produces = "application/json")
  public ResponseEntity<List<Trip>> allTrips(){
    if(trips.isEmpty()) {
      return notFound().build();
    }
    return ok(trips);
  }

  @GetMapping(value = "/byId/{id}", produces = "application/json")
  public ResponseEntity<Trip> tripsById(@PathVariable int id) {
    return trips.stream()
      .filter(trip -> trip.getId() == id)
      .findFirst()
      .map(ResponseEntity::ok)
      .orElseGet(() -> notFound().build());
  }
  @PostMapping(consumes = "application/json")
  public ResponseEntity<String> addTrip(@RequestBody Trip newTrip) {
    if(trips.stream().anyMatch(trip -> trip.getId() == newTrip.getId())) {
      return badRequest()
        .body("Already a trip with id: " + newTrip.getId());
    }
    trips.add(newTrip);
    return new ResponseEntity<String>("POST Trip Response Ok", HttpStatus.OK);
  }
}
