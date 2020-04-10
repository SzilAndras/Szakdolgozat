package hu.bme.aut.infoservice.controller;

import hu.bme.aut.infoservice.model.NewsDto;
import hu.bme.aut.infoservice.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news")
public class NewsController {

    @Autowired
    NewsService newsService;

    @GetMapping
    public List<NewsDto> getAllNews(){
        return newsService.getAllNews();
    }

    @PostMapping("/save")
    public NewsDto saveNews(@RequestBody NewsDto news) {
        return newsService.saveNews(news);
    }

    @DeleteMapping("/delete")
    public void deleteNews(@RequestBody NewsDto news) {
        newsService.deleteNews(news);
    }
}
