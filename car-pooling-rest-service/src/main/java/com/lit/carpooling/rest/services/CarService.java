package com.lit.carpooling.rest.services;

import com.lit.carpooling.rest.model.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.function.Predicate;

import static java.util.stream.Collectors.toList;
import static org.springframework.http.ResponseEntity.*;
import static org.springframework.http.ResponseEntity.noContent;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/cars")
public class CarService {
    @Autowired
    private List<Car> cars;

    @GetMapping(produces = "application/json")
    public ResponseEntity<List<Car>> allCars(){

      if(cars.isEmpty()) {
        return notFound().build();
      }
      return ok(cars);
    }
  @GetMapping(value = "/byCarId/{id}", produces = "application/json")
  public ResponseEntity<Car> carsByCarId(@PathVariable int id) {
    return cars.stream()
      .filter(car -> car.getId() == id)
      .findFirst()
      .map(ResponseEntity::ok)
      .orElseGet(() -> notFound().build());
  }
  @GetMapping(value = "/byOwnerId/{id}", produces = "application/json")
  public ResponseEntity<List<Car>> carsByOwnerId(@PathVariable int id) {
    return filterCarsToResponse(car -> car.getOwnerId() == id);
  }

  @PostMapping(consumes = "application/json")
  public ResponseEntity<String> addCar(@RequestBody Car newCar) {
    if(cars.stream().anyMatch(car -> car.getId() == newCar.getId())) {
      return badRequest()
        .body("Already a car with id: " + newCar.getId());
    }
    cars.add(newCar);
    return noContent().build();
  }

  private ResponseEntity<List<Car>> filterCarsToResponse(Predicate<Car> predicate) {
    var results = filterCarsToList(predicate);
    if (results.isEmpty()) {
      return notFound().build();
    }
    return ok(results);
  }
  private List<Car> filterCarsToList(Predicate<Car> predicate) {
    return cars.stream()
      .filter(predicate)
      .collect(toList());
  }
}
