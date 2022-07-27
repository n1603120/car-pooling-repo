package com.lit.carpooling.rest.services;

import com.lit.carpooling.rest.model.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/cars")
public class CarService {
    @Autowired
    private List<Car> cars;

    @GetMapping(produces = "application/json")
    public List<Car> allCars(){
      return cars;
    }
}
