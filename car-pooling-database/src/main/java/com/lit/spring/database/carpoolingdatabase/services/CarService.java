package com.lit.spring.database.carpoolingdatabase.services;

import com.lit.spring.database.carpoolingdatabase.CarRepository;
import com.lit.spring.database.carpoolingdatabase.entities.Car;
import com.lit.spring.database.carpoolingdatabase.entities.Person;
import com.lit.spring.database.carpoolingdatabase.exception.ResourceNotFoundException;
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
@RequestMapping("/cars")
public class CarService {

    @Autowired
    private CarRepository carRepository;

    private List<Car> cars = new ArrayList<Car>();


    @GetMapping(produces = "application/json")
    public ResponseEntity<List<Car>> allCars(){
      if(cars.isEmpty()){
        carRepository.findAll().forEach(cars :: add);
      }
      if(cars.isEmpty()) {
        return notFound().build();
      }
      return ok(cars);
    }
    @GetMapping(value = "/byCarId/{id}", produces = "application/json")
    public ResponseEntity<Car> carsByCarId(@PathVariable int id) {

      return carRepository.findById(id)
        .map(ResponseEntity::ok)
        .orElseGet(() -> notFound().build());
    }

  @GetMapping(value = "/byOwnerId/{id}", produces = "application/json")
  public ResponseEntity<List<Car>> carsByOwnerId(@PathVariable int id) {
    return filterCarsToResponse(car -> car.getOwnerId() == id);
  }

  @GetMapping(value = "/byOwnerId/ActiveCar/{id}", produces = "application/json")
  public ResponseEntity<Car> carByActiveTrue(@PathVariable int id) {
    if(cars.isEmpty()){
      carRepository.findAll().forEach(cars :: add);
    }
    return cars.stream()
      .filter(car -> car.getOwnerId() == id && car.isActiveCar())
      .findFirst()
      .map(ResponseEntity::ok)
      .orElseGet(() -> notFound().build());
    //return filterCarsToResponse(car -> car.getOwnerId() == id && car.isActiveCar());
  }

  @PostMapping(consumes = "application/json")
  public ResponseEntity<String> addCar(@RequestBody Car newCar) {
    if(cars.isEmpty()){
      carRepository.findAll().forEach(cars :: add);
    }
    if(cars.stream().anyMatch(car -> car.getId() == newCar.getId())) {
      return badRequest()
        .body("Already a car with id: " + newCar.getId());
    }
    cars.add(newCar);
    carRepository.save(newCar);
    return new ResponseEntity<String>("POST Car Response Ok", HttpStatus.OK);
  }

  @PutMapping(value = "/{id}", consumes = "application/json")
  public ResponseEntity<String> updateCar(@PathVariable int id, @RequestBody Car newCar) {
    Car updateCar = carRepository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Car does not exist with id: " + id));
    updateCar.setActiveCar(newCar.isActiveCar());

    carRepository.save(updateCar);
    cars.clear();
    return new ResponseEntity<String>("PUT Car Response Ok", HttpStatus.OK);
//    if(cars.isEmpty()){
//      carRepository.findAll().forEach(cars :: add);
//    }
//    if(cars.stream().noneMatch(car -> car.getId() == newCar.getId())) {
//      return badRequest()
//        .body("Update stopped, No car has the ID: " + newCar.getId());
//    }
//    carRepository.save(newCar);
//    cars.clear();
//    return new ResponseEntity<String>("PUT Car Response Ok", HttpStatus.OK);
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<String> deleteCar(@PathVariable("id") int id) {
    if(cars.stream().noneMatch(car -> car.getId() == id)) {
      return badRequest()
        .body("Update stopped, No Car has the ID: " + id);
    }
    carRepository.deleteById(id);
    cars.clear();
    return new ResponseEntity<String>("DELETE Car Response Ok", HttpStatus.OK);
  }

  private ResponseEntity<List<Car>> filterCarsToResponse(Predicate<Car> predicate) {
    var results = filterCarsToList(predicate);
    if (results.isEmpty()) {
      return notFound().build();
    }
    return ok(results);
  }
  private List<Car> filterCarsToList(Predicate<Car> predicate) {
    if(cars.isEmpty()){
      carRepository.findAll().forEach(cars :: add);
    }
    return cars.stream().filter(predicate).collect(toList());
  }
}
