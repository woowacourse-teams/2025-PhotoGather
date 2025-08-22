package com.forgather.domain.space.model;

import java.util.Objects;

import com.forgather.domain.guest.model.Guest;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "content_type")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class SpaceContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @JoinColumn(name = "space_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    protected Space space;

    @JoinColumn(name = "guest_id")
    @OneToOne(fetch = FetchType.LAZY)
    protected Guest guest;

    protected SpaceContent(Space space, Guest guest) {
        this.space = space;
        this.guest = guest;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof SpaceContent that))
            return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
