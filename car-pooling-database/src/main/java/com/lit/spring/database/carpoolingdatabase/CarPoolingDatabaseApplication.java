package com.lit.spring.database.carpoolingdatabase;

import com.lit.spring.database.carpoolingdatabase.entities.Car;
import com.lit.spring.database.carpoolingdatabase.entities.Person;
import com.lit.spring.database.carpoolingdatabase.entities.Trip;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Optional;

@SpringBootApplication
public class CarPoolingDatabaseApplication {

  public static void main(String[] args) {
    SpringApplication.run(CarPoolingDatabaseApplication.class, args);
  }

  @Bean
  public CommandLineRunner runDemo(CarRepository cars,
                                   PersonRepository people,
                                   TripRepository trips) {
    return args -> {
      showCoreFeatures(cars, people, trips);
    };
  }

  private void showCoreFeatures(CarRepository cars, PersonRepository people, TripRepository trips) {
    printCarDetails(cars);
    printPersonDetails(people);
    printTripDetails(trips);
  }


  private void printPersonDetails(PersonRepository repository) {
    Optional<Person> opt = repository.findById(1);
    opt.ifPresent(person -> {
      String firstName = person.getFirstName();
      String lastName = person.getLastName();

      String msg = "\tPerson with id: 1, '%s' '%s'\n";
      System.out.printf(msg, firstName, lastName);
    });
  }
  private void printTripDetails(TripRepository repository) {
    Optional<Trip> opt = repository.findById(1);
    opt.ifPresent(trip -> {
      String town = trip.getTown();
      String tripDate = trip.getDate();

      String msg = "\tTrip with id: 1, '%s' '%s'\n";
      System.out.printf(msg, town, tripDate);
    });
  }
  private void printCarDetails(CarRepository repository) {
    Optional<Car> opt = repository.findById(1);
    opt.ifPresent(car -> {
      String make = car.getMake();
      String c = car.getRegistration();

      String msg = "\tCar with id: 1, '%s' '%s'\n";
      System.out.printf(msg, make, c);
    });
  }

}
