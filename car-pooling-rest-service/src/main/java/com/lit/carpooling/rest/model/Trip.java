package com.lit.carpooling.rest.model;

public class Trip {
  private String postcode;
  private String destination;
  private String date;
  private String time;
  private Car car;

  public Trip(String postcode, String destination, String date, String time, Car car) {
    this.postcode = postcode;
    this.destination = destination;
    this.date = date;
    this.time = time;
    this.car = car;
  }

  public String getPostcode() {
    return postcode;
  }

  public void setPostcode(String postcode) {
    this.postcode = postcode;
  }

  public String getDestination() {
    return destination;
  }

  public void setDestination(String destination) {
    this.destination = destination;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getTime() {
    return time;
  }

  public void setTime(String time) {
    this.time = time;
  }

  public Car getCar() {
    return car;
  }

  public void setCar(Car car) {
    this.car = car;
  }
}
