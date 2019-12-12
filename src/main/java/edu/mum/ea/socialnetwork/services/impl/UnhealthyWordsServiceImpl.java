package edu.mum.ea.socialnetwork.services.impl;

import edu.mum.ea.socialnetwork.domain.UnhealthyWord;
import edu.mum.ea.socialnetwork.repository.UnhealthyWordRepository;
import edu.mum.ea.socialnetwork.services.UnhealthyWordService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UnhealthyWordsServiceImpl implements UnhealthyWordService {

    private UnhealthyWordRepository unhealthyWordRepository;

    @Override
    public void removeWord(String word) {
        unhealthyWordRepository.deleteByWordIs(word);
    }

    @Override
    public boolean wordExists(String word) {
        return unhealthyWordRepository.existsByWord(word);
    }

    @Override
    public void addWord(String word) {
        word = word.trim();
        if (!unhealthyWordRepository.existsByWord(word))
            unhealthyWordRepository.save(new UnhealthyWord(word));
    }

    @Override
    public List<UnhealthyWord> getUnhealthyWordList() {
        return unhealthyWordRepository.findAll();
    }

    @Autowired
    public UnhealthyWordsServiceImpl(UnhealthyWordRepository unhealthyWordRepository) {
        this.unhealthyWordRepository = unhealthyWordRepository;
    }
}
