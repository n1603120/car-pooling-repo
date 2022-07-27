package com.lit.carpooling.rest.model;

public class Car {
    private int ownerId;
    private String make;
    private String registration;
    private int numOfSeats;
    private String preferredContact;
    private boolean smokingOption;
    private boolean accessibility;
    private String preferredPickUp;
    private boolean activeCar;

    public Car(int ownerId, String make, String registration, int numOfSeats, String preferredContact, boolean smokingOption, boolean accessibility, String preferredPickUp, boolean activeCar) {
      this.ownerId = ownerId;
      this.make = make;
      this.registration = registration;
      this.numOfSeats = numOfSeats;
      this.preferredContact = preferredContact;
      this.smokingOption = smokingOption;
      this.accessibility = accessibility;
      this.preferredPickUp = preferredPickUp;
      this.activeCar = activeCar;
    }
    public Car(){

    }
    public int getOwnerId() {
      return ownerId;
    }

    public void setOwnerId(int ownerId) {
      this.ownerId = ownerId;
    }

    public String getMake() {
      return make;
    }

    public void setMake(String make) {
      this.make = make;
    }

    public String getRegistration() {
      return registration;
    }

    public void setRegistration(String registration) {
      this.registration = registration;
    }

    public int getNumOfSeats() {
      return numOfSeats;
    }

    public void setNumOfSeats(int numOfSeats) {
      this.numOfSeats = numOfSeats;
    }

    public String getPreferredContact() {
      return preferredContact;
    }

    public void setPreferredContact(String preferredContact) {
      this.preferredContact = preferredContact;
    }

    public boolean isSmokingOption() {
      return smokingOption;
    }

    public void setSmokingOption(boolean smokingOption) {
      this.smokingOption = smokingOption;
    }

    public boolean isAccessibility() {
      return accessibility;
    }

    public void setAccessibility(boolean accessibility) {
      this.accessibility = accessibility;
    }

    public String getPreferredPickUp() {
      return preferredPickUp;
    }

    public void setPreferredPickUp(String preferredPickUp) {
      this.preferredPickUp = preferredPickUp;
    }

    public boolean isActiveCar() {
      return activeCar;
    }

    public void setActiveCar(boolean activeCar) {
      this.activeCar = activeCar;
    }
}
