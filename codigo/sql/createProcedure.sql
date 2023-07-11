CREATE DEFINER=`root`@`localhost` PROCEDURE `AvaliarDenunciaComentarioOfensivo`(
    IN denuncia_id INT,
    IN acao VARCHAR(10)
)
BEGIN
   DECLARE avaliacao_id INT;
   
   -- Obter ID da avaliação associada à denúncia
    SELECT id_avaliacao INTO avaliacao_id
    FROM Denuncias
    WHERE id = denuncia_id;
    
    IF acao = 'ignorar' THEN
    DELETE FROM Denuncias 
    WHERE id = denuncia_id;
    
    ELSEIF acao = 'aceitar' THEN
        -- Excluir a denúncia da tabela Denuncias
        DELETE FROM Denuncias
        WHERE id = denuncia_id;
        -- Aceitar a denúncia e excluir a avaliação associada
        DELETE FROM Avaliacoes
        WHERE id = avaliacao_id;
    END IF;
END