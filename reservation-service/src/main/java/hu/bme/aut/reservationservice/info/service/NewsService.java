package hu.bme.aut.reservationservice.info.service;

import hu.bme.aut.reservationservice.info.model.News;
import hu.bme.aut.reservationservice.info.model.NewsDto;
import hu.bme.aut.reservationservice.info.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NewsService {

    @Autowired
    NewsRepository newsRepository;

    public List<NewsDto> getAllNews() {
        return newsRepository.findAll().stream().map(news -> NewsDto.builder()
                .id(news.getId())
                .authorName(news.getAuthorName())
                .createdDate(news.getCreatedDate())
                .lastModifiedDate(news.getLastModifiedDate())
                .tags(news.getTags())
                .text(news.getText())
                .build()
        ).collect(Collectors.toList());
    }

    public NewsDto saveNews(NewsDto news, String author) {
        News newNews = newsRepository.save(
                News.builder()
                .tags(news.getTags())
                .authorName(author)
                .text(news.getText())
                .build()
        );
        return NewsDto.builder()
                .id(newNews.getId())
                .authorName(newNews.getAuthorName())
                .createdDate(newNews.getCreatedDate())
                .lastModifiedDate(newNews.getLastModifiedDate())
                .tags(newNews.getTags())
                .text(newNews.getText())
                .build();
    }

    public void deleteNews(NewsDto news) {
        newsRepository.deleteById(news.getId());
    }


}
