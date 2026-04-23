package com.yash.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class InternshipController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ApplicationRepository applicationRepo;

    private String loggedUser = null;

    // 🔥 INTERNSHIPS (STATIC)
    @GetMapping("/internships")
    public List<Map<String, String>> getInternships() {

        List<Map<String, String>> list = new ArrayList<>();

        list.add(create("Web Developer Intern", "Google", "Remote", "₹10000/month"));
list.add(create("Data Science Intern", "Microsoft", "Bangalore", "₹15000/month"));
list.add(create("Frontend Developer Intern", "Amazon", "Remote", "₹12000/month"));
list.add(create("Backend Developer Intern", "Flipkart", "Bangalore", "₹14000/month"));
list.add(create("AI Intern", "OpenAI", "Remote", "₹20000/month"));
list.add(create("Android Developer Intern", "Samsung", "Noida", "₹13000/month"));
list.add(create("Cyber Security Intern", "TCS", "Mumbai", "₹11000/month"));
list.add(create("Cloud Intern", "AWS", "Remote", "₹18000/month"));
list.add(create("UI/UX Designer Intern", "Adobe", "Delhi", "₹9000/month"));
list.add(create("Marketing Intern", "Zomato", "Gurgaon", "₹8000/month"));

        return list;
    }

    private Map<String, String> create(String title, String company, String location, String stipend) {
        Map<String, String> map = new HashMap<>();
        map.put("title", title);
        map.put("company", company);
        map.put("location", location);
        map.put("stipend", stipend);
        return map;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public String register(@RequestBody User user) {

        if (userRepo.findByUsername(user.getUsername()) != null) {
            return "User already exists";
        }

        userRepo.save(user);
        return "Registered Successfully";
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existing = userRepo.findByUsername(user.getUsername());

        if (existing != null && existing.getPassword().equals(user.getPassword())) {
            loggedUser = user.getUsername();
            return "Login Successful";
        }

        return "Invalid Credentials";
    }
    @GetMapping("/applications")
public List<Application> getApplications() {

    if (loggedUser == null) {
        return new ArrayList<>();
    }

    List<Application> all = applicationRepo.findAll();

    List<Application> result = new ArrayList<>();

    for (Application app : all) {
        if (app.getUsername().equals(loggedUser)) {
            result.add(app);
        }
    }

    return result;
}
    
    // ✅ APPLY (NOW STORED IN DB)
    @PostMapping("/apply")
    public String apply(@RequestBody Map<String, String> data) {

        if (loggedUser == null) {
            return "Please login first!";
        }

        String internship = data.get("internship");

        Application app = new Application();
        app.setUsername(loggedUser);
        app.setInternship(internship);

        applicationRepo.save(app);

        return "Application Submitted!";
    }
}
