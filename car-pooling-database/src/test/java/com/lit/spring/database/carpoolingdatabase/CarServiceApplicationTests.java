package com.lit.spring.database.carpoolingdatabase;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CarServiceApplicationTests {
  private static final MediaType JSON_CONTENT_TYPE = MediaType.parseMediaType("application/json;charset=UTF-8");

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void allCarsCanBeFound() throws Exception {
    mockMvc.perform(get("/cars").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(status().isOk());
  }
  @Test
  public void carsCanBeFoundByCarID() throws Exception {
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
  public void carsCanBeFoundByOwnerID() throws Exception {
    String content =
      "{\"id\": \"100\",\"ownerId\": \"100\", \"make\": \"BMW\", \"registration\": \"KZZ6536\", \"numOfSeats\": \"4\",\"preferredContact\": \"Email\",\"smokingOption\": \"false\",\"accessibility\": \"false\",\"preferredPickUp\": \"Coleraine, Ballymena\",\"activeCar\": \"false\"}";
    mockMvc.perform(post("/cars").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/cars/byOwnerId/100").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.[0].id").value(100))
      .andExpect(jsonPath("$.[0].ownerId").value(100))
      .andExpect(jsonPath("$.[0].make").value("BMW"))
      .andExpect(jsonPath("$.[0].registration").value("KZZ6536"))
      .andExpect(jsonPath("$.[0].numOfSeats").value(4))
      .andExpect(jsonPath("$.[0].preferredContact").value("Email"))
      .andExpect(jsonPath("$.[0].smokingOption").value(false))
      .andExpect(jsonPath("$.[0].accessibility").value(false))
      .andExpect(jsonPath("$.[0].preferredPickUp").value("Coleraine, Ballymena"))
      .andExpect(jsonPath("$.[0].activeCar").value(false));
    mockMvc.perform(delete("/cars/100"))
      .andExpect(status().isOk());
  }
  @Test
  public void carsCanBeFoundByActiveTrue() throws Exception {
    String content =
      "{\"id\": \"100\",\"ownerId\": \"100\", \"make\": \"BMW\", \"registration\": \"KZZ6536\", \"numOfSeats\": \"4\",\"preferredContact\": \"Email\",\"smokingOption\": \"false\",\"accessibility\": \"false\",\"preferredPickUp\": \"Coleraine, Ballymena\",\"activeCar\": \"true\"}";
    mockMvc.perform(post("/cars").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/cars/byOwnerId/ActiveCar/100").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(2))
      .andExpect(jsonPath("$.ownerId").value(2))
      .andExpect(jsonPath("$.make").value("BMW"))
      .andExpect(jsonPath("$.registration").value("GHU6536"))
      .andExpect(jsonPath("$.numOfSeats").value(4))
      .andExpect(jsonPath("$.preferredContact").value("Phone"))
      .andExpect(jsonPath("$.smokingOption").value(false))
      .andExpect(jsonPath("$.accessibility").value(true))
      .andExpect(jsonPath("$.preferredPickUp").value("Coleraine, Ballymena"))
      .andExpect(jsonPath("$.activeCar").value(true));
    mockMvc.perform(delete("/cars/100"))
      .andExpect(status().isOk());
  }
  @Test
  @DirtiesContext
  public void carCanBeAddedAndRemoved() throws Exception {
    String content =
      "{\"id\": \"100\",\"ownerId\": \"2\", \"make\": \"BMW\", \"registration\": \"KZZ6536\", \"numOfSeats\": \"4\",\"preferredContact\": \"Email\",\"smokingOption\": \"false\",\"accessibility\": \"false\",\"preferredPickUp\": \"Coleraine, Ballymena\",\"activeCar\": \"false\"}";
    mockMvc.perform(post("/cars").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/cars").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$[?(@.id == '100')]", hasSize(1)));
    mockMvc.perform(get("/cars/byCarId/100").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(100))
      .andExpect(jsonPath("$.ownerId").value(2))
      .andExpect(jsonPath("$.make").value("BMW"))
      .andExpect(jsonPath("$.registration").value("KZZ6536"))
      .andExpect(jsonPath("$.numOfSeats").value(4))
      .andExpect(jsonPath("$.preferredContact").value("Email"))
      .andExpect(jsonPath("$.smokingOption").value(false))
      .andExpect(jsonPath("$.accessibility").value(false))
      .andExpect(jsonPath("$.preferredPickUp").value("Coleraine, Ballymena"))
      .andExpect(jsonPath("$.activeCar").value(false));
    mockMvc.perform(delete("/cars/100"))
      .andExpect(status().isOk());
    mockMvc.perform(get("/cars").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$[?(@.id == '100')]", hasSize(0)));
  }
  @Test
  @DirtiesContext
  public void carIdPresentCantBeAdded() throws Exception {
    String content =
      "{\"id\": \"100\",\"ownerId\": \"2\", \"make\": \"BMW\", \"registration\": \"KZZ6536\", \"numOfSeats\": \"4\",\"preferredContact\": \"Email\",\"smokingOption\": \"false\",\"accessibility\": \"false\",\"preferredPickUp\": \"Coleraine, Ballymena\",\"activeCar\": \"false\"}";
    mockMvc.perform(post("/cars").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/cars").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$[?(@.id == '100')]", hasSize(1)));
    mockMvc.perform(post("/cars").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isBadRequest());
    mockMvc.perform(delete("/cars/100"))
      .andExpect(status().isOk());
  }
  @Test
  @DirtiesContext
  public void carIdNotPresentCantBeRemoved() throws Exception {
    mockMvc.perform(delete("/cars/100"))
      .andExpect(status().isBadRequest());
  }
  @Test
  @DirtiesContext
  public void carCanBeUpdated() throws Exception {
    String content =
      "{\"id\": \"100\",\"ownerId\": \"2\", \"make\": \"BMW\", \"registration\": \"KZZ6536\", \"numOfSeats\": \"4\",\"preferredContact\": \"Email\",\"smokingOption\": \"false\",\"accessibility\": \"false\",\"preferredPickUp\": \"Coleraine, Ballymena\",\"activeCar\": \"false\"}";
    mockMvc.perform(post("/cars").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/cars").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$[?(@.id == '100')]", hasSize(1)));
    String updatedContent =
      "{\"id\": \"100\",\"ownerId\": \"2\", \"make\": \"BMW\", \"registration\": \"KZZ6536\", \"numOfSeats\": \"4\",\"preferredContact\": \"Email\",\"smokingOption\": \"false\",\"accessibility\": \"false\",\"preferredPickUp\": \"Coleraine, Ballymena\",\"activeCar\": \"true\"}";
    mockMvc.perform(put("/cars").contentType(JSON_CONTENT_TYPE).content(updatedContent))
      .andExpect(status().isOk());
    mockMvc.perform(get("/cars").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$[?(@.id == '100')]", hasSize(1)));
    mockMvc.perform(get("/cars/byCarId/100").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(100))
      .andExpect(jsonPath("$.activeCar").value(true));
    mockMvc.perform(delete("/cars/100"))
      .andExpect(status().isOk());
  }
}
