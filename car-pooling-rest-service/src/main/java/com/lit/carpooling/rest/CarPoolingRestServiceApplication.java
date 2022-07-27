package com.lit.carpooling.rest;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CarPoolingRestServiceApplication {

	public static void main(String[] args) {
    SpringApplication.run(CarPoolingRestServiceApplication.class, args);
	}
  @Bean
  public CommandLineRunner rooney(){
    return args -> System.out.println("Hello Spring Boot from Rooney");
  }


}
