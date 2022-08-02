package com.lit.spring.database.carpoolingdatabase;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TripServiceApplicationTests {
  private static final MediaType JSON_CONTENT_TYPE = MediaType.parseMediaType("application/json;charset=UTF-8");

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void allTripsCanBeFound() throws Exception {
    mockMvc.perform(get("/trips").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(4)));
  }

  @Test
  public void tripsCanBeFoundByID() throws Exception {
    mockMvc.perform(get("/trips/byId/1").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(1))
      .andExpect(jsonPath("$.postcode").value("BT514DS"))
      .andExpect(jsonPath("$.destination").value("Belfast Office"))
      .andExpect(jsonPath("$.date").value("23/08/2022"))
      .andExpect(jsonPath("$.time").value("18:30"))
      .andExpect(jsonPath("$.carId").value(1));
  }

  @Test
  @DirtiesContext
  public void tripCanBeAdded() throws Exception {
    String content =
      "{\"id\": \"5\",\"postcode\": \"BT76HDS\", \"destination\": \"Belfast Office\", \"date\": \"12/12/2022\", \"time\": \"18:30\",\"carId\": \"1\"}";
    mockMvc.perform(post("/trips").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/trips").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(5)))
      .andExpect(jsonPath("$[?(@.id == '5')]", hasSize(1)));
    mockMvc.perform(get("/trips/byId/5").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(5))
      .andExpect(jsonPath("$.postcode").value("BT76HDS"))
      .andExpect(jsonPath("$.destination").value("Belfast Office"))
      .andExpect(jsonPath("$.date").value("12/12/2022"))
      .andExpect(jsonPath("$.time").value("18:30"))
      .andExpect(jsonPath("$.carId").value(1));
  }
  @Test
  @DirtiesContext
  public void tripIdPresentCantBeAdded() throws Exception {
    String content =
      "{\"id\": \"5\",\"postcode\": \"BT76HDS\", \"destination\": \"Belfast Office\", \"date\": \"12/12/2022\", \"time\": \"18:30\",\"carId\": \"1\"}";
    mockMvc.perform(post("/trips").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/trips").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(5)))
      .andExpect(jsonPath("$[?(@.id == '5')]", hasSize(1)));
    mockMvc.perform(post("/trips").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isBadRequest());
  }
}
