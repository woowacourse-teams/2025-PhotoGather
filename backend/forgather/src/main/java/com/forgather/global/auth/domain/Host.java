package com.forgather.global.auth.domain;

import java.util.ArrayList;
import java.util.List;

import com.forgather.domain.model.BaseTimeEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Host extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "host", cascade = CascadeType.ALL)
    private List<SpaceHostMap> spaceHostMap = new ArrayList<>();

    @Column(name = "name")
    private String name;

    @Column(name = "picture_url")
    private String pictureUrl;

    public Host(String name, String pictureUrl) {
        this.name = name;
        this.pictureUrl = pictureUrl;
    }
}
