package com.lit.carpooling.rest.services;

import com.lit.carpooling.rest.model.Person;
import com.lit.carpooling.rest.model.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
  }
