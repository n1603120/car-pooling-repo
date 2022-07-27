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
      new Trip("BT514DS", "Belfast Office", "23/08/2022", "18:30",new Car(1, "Ford Fiesta", "MFZ6536", 4, "Email", true, true, "Ballymoney", true)),
      new Trip("BT94DSS", "Belfast Office", "27/10/2022", "18:30",new Car(2, "BMW", "GHU6536", 4, "Phone", false, true, "Coleraine, Ballymena", true)),
      new Trip("BT516JD", "Dublin Office", "14/11/2022", "18:30",new Car(3, "Honda", "ESD6536", 4, "Phone", false, false, "Castlerock", true)),
      new Trip("BT516JD", "Dublin Office", "14/11/2022", "18:30",new Car(3, "Honda", "ESD6536", 4, "Phone", false, false, "Castlerock", true))
    );
    return new ArrayList<>(trips);
  }
}
