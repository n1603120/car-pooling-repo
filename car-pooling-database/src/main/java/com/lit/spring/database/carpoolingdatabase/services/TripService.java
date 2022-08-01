package com.lit.spring.database.carpoolingdatabase.services;

import com.lit.spring.database.carpoolingdatabase.TripRepository;
import com.lit.spring.database.carpoolingdatabase.entities.Trip;
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
  private TripRepository tripRepository;

  private List<Trip> trips;
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
}
