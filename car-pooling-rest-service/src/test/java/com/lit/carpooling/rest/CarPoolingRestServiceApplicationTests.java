package com.lit.carpooling.rest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CarPoolingRestServiceApplicationTests {

  private static final MediaType JSON_CONTENT_TYPE = MediaType.parseMediaType("application/json;charset=UTF-8");

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void allCarsCanBeFound() throws Exception {
    mockMvc.perform(get("/cars").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(4)));
  }
  @Test
  public void carsCanBeFoundByID() throws Exception {
    mockMvc.perform(get("/cars/byCarId/1").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(1))
      .andExpect(jsonPath("$.ownerId").value(1))
      .andExpect(jsonPath("$.make").value("Ford Fiesta"))
      .andExpect(jsonPath("$.registration").value("MFZ6536"))
      .andExpect(jsonPath("$.numOfSeats").value(4))
      .andExpect(jsonPath("$.preferredContact").value("Email"))
      .andExpect(jsonPath("$.smokingOption").value(true))
      .andExpect(jsonPath("$.accessibility").value(true))
      .andExpect(jsonPath("$.preferredPickUp").value("Ballymoney"))
      .andExpect(jsonPath("$.activeCar").value(true));
  }
  @Test
  public void allPeopleCanBeFound() throws Exception {
    mockMvc.perform(get("/people").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(4)));
  }
  @Test
  @DirtiesContext
  public void personCanBeAdded() throws Exception {
    String content =
      "{\"id\": \"5\",\"firstName\": \"Wayne\", \"lastName\": \"Rooney\", \"email\": \"Rooney@hotmail.com\", \"phoneNumber\": \"07723459470\",\"postcode\": \"BT76HDS\",\"password\": \"Password1!\"}";
    mockMvc.perform(post("/people/5").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/people").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(5)))
      .andExpect(jsonPath("$[?(@.email == 'Rooney@hotmail.com')]", hasSize(1)));
    mockMvc.perform(get("/user/byId/").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.fname").value("James"))
      .andExpect(jsonPath("$.lname").value("Barns"))
      .andExpect(jsonPath("$.email").value("james12@hotmail.com"))
      .andExpect(jsonPath("$.mobileNumber").value("0777774"))
      .andExpect(jsonPath("$.password").value("Password1!"));
  }
  @Test
  public void allTripsCanBeFound() throws Exception {
    mockMvc.perform(get("/trips").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(4)));
  }

}
