package com.lit.spring.database.carpoolingdatabase.services;

import org.springframework.core.convert.ConversionFailedException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.badRequest;

@RestController
@ControllerAdvice
public class ErrorService {
  @ExceptionHandler(value = ConversionFailedException.class)
  public ResponseEntity<String> conversionError(ConversionFailedException ex) {
    return badRequest().body(ex.getMessage());
  }
}
