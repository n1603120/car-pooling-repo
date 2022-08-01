package com.lit.spring.database.carpoolingdatabase;

import com.lit.spring.database.carpoolingdatabase.entities.Car;
import org.springframework.data.repository.CrudRepository;

public interface CarRepository extends CrudRepository<Car, Integer> {

}
