package org.espe.revelo_categorias;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class ReveloCategoriasApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReveloCategoriasApplication.class, args);
    }

}
