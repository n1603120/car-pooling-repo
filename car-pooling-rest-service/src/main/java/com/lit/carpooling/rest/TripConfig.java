package com.lit.carpooling.rest;

import com.lit.carpooling.rest.model.Car;
import com.lit.carpooling.rest.model.Trip;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class TripConfig {
  @Bean
  public List<Trip> buildTrips(){
    var trips = List.of(
      new Trip(1,"BT514DS", "Belfast Office", "23/08/2022", "18:30",1),
      new Trip(2,"BT94DSS", "Belfast Office", "27/10/2022", "18:30",2),
      new Trip(3,"BT516JD", "Dublin Office", "14/11/2022", "18:30",3),
      new Trip(4,"BT516JD", "Dublin Office", "14/11/2022", "18:30",4)
    );
    return new ArrayList<>(trips);
  }
}
