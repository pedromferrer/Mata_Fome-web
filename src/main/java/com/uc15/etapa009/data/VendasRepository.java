package com.uc15.etapa009.data;

import com.uc15.etapa009.data.VendasEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendasRepository extends JpaRepository<VendasEntity, Long> {
    // Métodos de consulta adicionais podem ser definidos aqui
}