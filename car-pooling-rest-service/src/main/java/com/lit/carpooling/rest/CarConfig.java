package com.lit.carpooling.rest;

import com.lit.carpooling.rest.model.Car;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class CarConfig {
  @Bean
  public List<Car> buildCars(){
    var cars = List.of(
      new Car(1,1, "Ford Fiesta", "MFZ6536", 4, "Email", true, true, "Ballymoney", true),
      new Car(2,2, "BMW", "GHU6536", 4, "Phone", false, true, "Coleraine, Ballymena", true),
      new Car(3,3, "Honda", "ESD6536", 4, "Phone", false, false, "Castlerock", true),
      new Car(4,1, "Golf", "LGK6536", 4, "Email", true, true, "Portrush", false)
    );
    return new ArrayList<>(cars);
  }
}
