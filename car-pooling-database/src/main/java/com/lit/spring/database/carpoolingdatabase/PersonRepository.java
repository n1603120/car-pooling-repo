package com.lit.spring.database.carpoolingdatabase;

import com.lit.spring.database.carpoolingdatabase.entities.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, Integer>{

}
