package com.lit.spring.database.carpoolingdatabase;

import com.lit.spring.database.carpoolingdatabase.entities.Trip;
import org.springframework.data.repository.CrudRepository;

public interface TripRepository extends CrudRepository<Trip, Integer>{

}
