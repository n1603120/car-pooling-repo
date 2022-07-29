package com.lit.carpooling.rest.CarPoolingRestServiceApplicationTests;

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
public class PersonServiceApplicationTests {
  private static final MediaType JSON_CONTENT_TYPE = MediaType.parseMediaType("application/json;charset=UTF-8");

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void allPeopleCanBeFound() throws Exception {
    mockMvc.perform(get("/people").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(4)));
  }
  @Test
  public void peopleCanBeFoundByID() throws Exception {
    mockMvc.perform(get("/people/byId/1").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(1))
      .andExpect(jsonPath("$.firstName").value("Mark"))
      .andExpect(jsonPath("$.lastName").value("Millsopp"))
      .andExpect(jsonPath("$.email").value("mark.millsopp@gmail.com"))
      .andExpect(jsonPath("$.phoneNumber").value("07711019490"))
      .andExpect(jsonPath("$.postcode").value("BT514DS"))
      .andExpect(jsonPath("$.password").value("Password1!"));
  }
  @Test
  @DirtiesContext
  public void personCanBeAdded() throws Exception {
    String content =
      "{\"id\": \"5\",\"firstName\": \"Wayne\", \"lastName\": \"Rooney\", \"email\": \"Rooney@hotmail.com\", \"phoneNumber\": \"07723459470\",\"postcode\": \"BT76HDS\",\"password\": \"Password1!\"}";
    mockMvc.perform(post("/people").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/people").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(5)))
      .andExpect(jsonPath("$[?(@.email == 'Rooney@hotmail.com')]", hasSize(1)));
    mockMvc.perform(get("/people/byId/5").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(5))
      .andExpect(jsonPath("$.firstName").value("Wayne"))
      .andExpect(jsonPath("$.lastName").value("Rooney"))
      .andExpect(jsonPath("$.email").value("Rooney@hotmail.com"))
      .andExpect(jsonPath("$.phoneNumber").value("07723459470"))
      .andExpect(jsonPath("$.postcode").value("BT76HDS"))
      .andExpect(jsonPath("$.password").value("Password1!"));
  }
  @Test
  @DirtiesContext
  public void personIdPresentCantBeAdded() throws Exception {
    String content =
      "{\"id\": \"5\",\"firstName\": \"Wayne\", \"lastName\": \"Rooney\", \"email\": \"Rooney@hotmail.com\", \"phoneNumber\": \"07723459470\",\"postcode\": \"BT76HDS\",\"password\": \"Password1!\"}";
    mockMvc.perform(post("/people").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/people").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(5)))
      .andExpect(jsonPath("$[?(@.id == '5')]", hasSize(1)));
    mockMvc.perform(post("/people").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isBadRequest());
  }
  @Test
  @DirtiesContext
  public void personCanBeUpdated() throws Exception {
    String content =
      "{\"id\": \"5\",\"firstName\": \"Wayne\", \"lastName\": \"Rooney\", \"email\": \"Rooney@hotmail.com\", \"phoneNumber\": \"07723459470\",\"postcode\": \"BT76HDS\",\"password\": \"Password1!\"}";
    mockMvc.perform(post("/people").contentType(JSON_CONTENT_TYPE).content(content))
      .andExpect(status().isOk());
    mockMvc.perform(get("/people").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(5)))
      .andExpect(jsonPath("$[?(@.id == '5')]", hasSize(1)));
    String updatedContent =
      "{\"id\": \"5\",\"firstName\": \"Wayne Mark\", \"lastName\": \"Rooney\", \"email\": \"Rooney@gmail.com\", \"phoneNumber\": \"07723459470\",\"postcode\": \"BT76HDS\",\"password\": \"Password1!\"}";
    mockMvc.perform(put("/people").contentType(JSON_CONTENT_TYPE).content(updatedContent))
      .andExpect(status().isOk());
    mockMvc.perform(get("/people").accept(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$").isArray())
      .andExpect(jsonPath("$", hasSize(5)))
      .andExpect(jsonPath("$[?(@.email == 'Rooney@gmail.com')]", hasSize(1)));
    mockMvc.perform(get("/people/byId/5").accept(JSON_CONTENT_TYPE))
      .andExpect(status().isOk())
      .andExpect(content().contentType(JSON_CONTENT_TYPE))
      .andExpect(jsonPath("$.id").value(5))
      .andExpect(jsonPath("$.firstName").value("Wayne Mark"))
      .andExpect(jsonPath("$.lastName").value("Rooney"))
      .andExpect(jsonPath("$.email").value("Rooney@gmail.com"))
      .andExpect(jsonPath("$.phoneNumber").value("07723459470"))
      .andExpect(jsonPath("$.postcode").value("BT76HDS"))
      .andExpect(jsonPath("$.password").value("Password1!"));
  }
}
