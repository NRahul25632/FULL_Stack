package edu.sample;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
	
	@GetMapping("Product")
	public String productService() {
		return " Product Service Pages can be loaded here";
	}

}
