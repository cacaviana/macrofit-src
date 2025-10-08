-- ================================================
-- SCRIPT SQL PARA MACROFIT - SCHEMA: maf
-- Banco de dados: Microsoft SQL Server
-- Versão: 1.0
-- Data: 2025-10-07
-- ================================================

-- Criar schema maf se não existir
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'maf')
BEGIN
    EXEC('CREATE SCHEMA maf')
END
GO

-- ================================================
-- TABELAS DE USUÁRIOS E PERFIL
-- ================================================

-- Tabela de usuários
CREATE TABLE maf.users (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    email NVARCHAR(255) UNIQUE NOT NULL,
    name NVARCHAR(255) NOT NULL,
    password_hash NVARCHAR(500), -- para autenticação
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    is_active BIT DEFAULT 1,
    email_verified BIT DEFAULT 0,
    last_login DATETIME2
);

-- Tabela de perfis dos usuários
CREATE TABLE maf.user_profiles (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    current_weight DECIMAL(5,2), -- peso atual em kg
    target_weight DECIMAL(5,2), -- peso meta em kg
    height INT, -- altura em cm
    age INT, -- idade em anos
    gender NVARCHAR(10) CHECK (gender IN ('male', 'female')),
    activity_level NVARCHAR(20) CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'active')),
    goal NVARCHAR(20) CHECK (goal IN ('lose_weight', 'maintain_weight', 'gain_weight')),
    setup_completed BIT DEFAULT 0,
    setup_date DATETIME2,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    
    FOREIGN KEY (user_id) REFERENCES maf.users(id) ON DELETE CASCADE
);

-- Tabela de metas nutricionais calculadas
CREATE TABLE maf.nutrition_goals (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    daily_calories INT NOT NULL,
    daily_protein DECIMAL(6,2) NOT NULL, -- gramas
    daily_carbs DECIMAL(6,2) NOT NULL, -- gramas
    daily_fat DECIMAL(6,2) NOT NULL, -- gramas
    daily_water INT DEFAULT 2500, -- ml
    calculated_at DATETIME2 DEFAULT GETDATE(),
    is_active BIT DEFAULT 1,
    
    FOREIGN KEY (user_id) REFERENCES maf.users(id) ON DELETE CASCADE
);

-- ================================================
-- TABELAS DE REFEIÇÕES E ALIMENTOS
-- ================================================

-- Tabela de refeições
CREATE TABLE maf.meals (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    meal_type NVARCHAR(20) NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
    description NVARCHAR(1000), # descrição em texto livre
    source NVARCHAR(20) DEFAULT 'text' CHECK (source IN ('text', 'manual', 'barcode')),
    timestamp DATETIME2 NOT NULL,
    total_calories DECIMAL(7,2) DEFAULT 0,
    total_protein DECIMAL(6,2) DEFAULT 0,
    total_carbs DECIMAL(6,2) DEFAULT 0,
    total_fat DECIMAL(6,2) DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    
    FOREIGN KEY (user_id) REFERENCES maf.users(id) ON DELETE CASCADE
);

-- Tabela de alimentos (base de dados de alimentos)
CREATE TABLE maf.foods (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(255) NOT NULL,
    brand NVARCHAR(255),
    barcode NVARCHAR(50),
    calories_per_100g DECIMAL(6,2) NOT NULL,
    protein_per_100g DECIMAL(5,2) DEFAULT 0,
    carbs_per_100g DECIMAL(5,2) DEFAULT 0,
    fat_per_100g DECIMAL(5,2) DEFAULT 0,
    fiber_per_100g DECIMAL(5,2) DEFAULT 0,
    sodium_per_100g DECIMAL(8,2) DEFAULT 0, -- mg
    category NVARCHAR(100),
    is_verified BIT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Tabela de alimentos por refeição
CREATE TABLE maf.meal_foods (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    meal_id UNIQUEIDENTIFIER NOT NULL,
    food_id UNIQUEIDENTIFIER NOT NULL,
    quantity DECIMAL(8,2) NOT NULL, -- quantidade consumida
    unit NVARCHAR(20) DEFAULT 'g' CHECK (unit IN ('g', 'ml', 'unidade', 'colher', 'xícara')),
    calories DECIMAL(7,2) NOT NULL,
    protein DECIMAL(6,2) DEFAULT 0,
    carbs DECIMAL(6,2) DEFAULT 0,
    fat DECIMAL(6,2) DEFAULT 0,
    
    FOREIGN KEY (meal_id) REFERENCES maf.meals(id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES maf.foods(id)
);

-- ================================================
-- TABELAS DE EXERCÍCIOS
-- ================================================

-- Tabela de exercícios
CREATE TABLE maf.exercises (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    name NVARCHAR(255) NOT NULL,
    duration INT NOT NULL, -- duração em minutos
    intensity NVARCHAR(20) CHECK (intensity IN ('low', 'moderate', 'high')),
    calories_burned DECIMAL(6,2) DEFAULT 0,
    notes NVARCHAR(1000),
    timestamp DATETIME2 NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    
    FOREIGN KEY (user_id) REFERENCES maf.users(id) ON DELETE CASCADE
);

-- ================================================
-- TABELAS DE HIDRATAÇÃO
-- ================================================

-- Tabela de registros de água
CREATE TABLE maf.water_intake (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    amount INT NOT NULL, -- quantidade em ml
    timestamp DATETIME2 NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    
    FOREIGN KEY (user_id) REFERENCES maf.users(id) ON DELETE CASCADE
);

-- ================================================
-- TABELAS DE HISTÓRICO E PROGRESSO
-- ================================================

-- Tabela de histórico de peso
CREATE TABLE maf.weight_history (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    weight DECIMAL(5,2) NOT NULL, -- peso em kg
    timestamp DATETIME2 NOT NULL,
    notes NVARCHAR(500),
    created_at DATETIME2 DEFAULT GETDATE(),
    
    FOREIGN KEY (user_id) REFERENCES maf.users(id) ON DELETE CASCADE
);

-- ================================================
-- TABELAS DE CONQUISTAS E GAMIFICAÇÃO
-- ================================================

-- Tabela de tipos de conquistas
CREATE TABLE maf.achievement_types (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(1000),
    icon NVARCHAR(50),
    category NVARCHAR(100), -- 'nutrition', 'exercise', 'hydration', 'streak'
    condition_type NVARCHAR(50), -- 'count', 'streak', 'target', 'total'
    condition_value INT, -- valor necessário para desbloquear
    points INT DEFAULT 0,
    is_active BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Tabela de conquistas desbloqueadas pelos usuários
CREATE TABLE maf.user_achievements (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    achievement_type_id UNIQUEIDENTIFIER NOT NULL,
    unlocked_at DATETIME2 DEFAULT GETDATE(),
    progress_value INT DEFAULT 0,
    
    FOREIGN KEY (user_id) REFERENCES maf.users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_type_id) REFERENCES maf.achievement_types(id),
    UNIQUE(user_id, achievement_type_id) -- um usuário só pode ter cada conquista uma vez
);

-- ================================================
-- TABELAS DE INSIGHTS E RELATÓRIOS
-- ================================================

-- Tabela de insights gerados pela IA
CREATE TABLE maf.ai_insights (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    type NVARCHAR(50), -- 'nutrition', 'exercise', 'weight', 'general'
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(2000) NOT NULL,
    priority NVARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    data_period_start DATE, -- período dos dados analisados
    data_period_end DATE,
    is_read BIT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE(),
    
    FOREIGN KEY (user_id) REFERENCES maf.users(id) ON DELETE CASCADE
);

-- Tabela de resumos diários (para performance)
CREATE TABLE maf.daily_summaries (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    date DATE NOT NULL,
    total_calories DECIMAL(7,2) DEFAULT 0,
    total_protein DECIMAL(6,2) DEFAULT 0,
    total_carbs DECIMAL(6,2) DEFAULT 0,
    total_fat DECIMAL(6,2) DEFAULT 0,
    total_water INT DEFAULT 0, -- ml
    total_exercise_minutes INT DEFAULT 0,
    calories_burned DECIMAL(6,2) DEFAULT 0,
    weight DECIMAL(5,2), -- peso do dia, se registrado
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    
    FOREIGN KEY (user_id) REFERENCES maf.users(id) ON DELETE CASCADE,
    UNIQUE(user_id, date) -- um resumo por usuário por dia
);

-- ================================================
-- TABELAS DE CONFIGURAÇÕES E INTEGRAÇÕES
-- ================================================

-- Tabela de configurações do usuário
CREATE TABLE maf.user_settings (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    setting_key NVARCHAR(100) NOT NULL,
    setting_value NVARCHAR(1000),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    
    FOREIGN KEY (user_id) REFERENCES maf.users(id) ON DELETE CASCADE,
    UNIQUE(user_id, setting_key)
);

-- Tabela de integrações (Apple Health, Google Fit, etc.)
CREATE TABLE maf.integrations (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    user_id UNIQUEIDENTIFIER NOT NULL,
    integration_type NVARCHAR(50) NOT NULL, -- 'apple_health', 'google_fit', 'garmin'
    is_enabled BIT DEFAULT 0,
    access_token NVARCHAR(1000),
    refresh_token NVARCHAR(1000),
    token_expires_at DATETIME2,
    last_sync DATETIME2,
    sync_settings NVARCHAR(MAX), -- JSON com configurações específicas
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    
    FOREIGN KEY (user_id) REFERENCES maf.users(id) ON DELETE CASCADE,
    UNIQUE(user_id, integration_type)
);

-- ================================================
-- ÍNDICES PARA PERFORMANCE
-- ================================================

-- Índices para usuários
CREATE INDEX IX_users_email ON maf.users(email);
CREATE INDEX IX_users_created_at ON maf.users(created_at);

-- Índices para refeições
CREATE INDEX IX_meals_user_id_timestamp ON maf.meals(user_id, timestamp DESC);
CREATE INDEX IX_meals_meal_type ON maf.meals(meal_type);
CREATE INDEX IX_meals_date ON maf.meals(CAST(timestamp AS DATE));

-- Índices para exercícios
CREATE INDEX IX_exercises_user_id_timestamp ON maf.exercises(user_id, timestamp DESC);

-- Índices para hidratação
CREATE INDEX IX_water_intake_user_id_timestamp ON maf.water_intake(user_id, timestamp DESC);
CREATE INDEX IX_water_intake_date ON maf.water_intake(CAST(timestamp AS DATE));

-- Índices para resumos diários
CREATE INDEX IX_daily_summaries_user_date ON maf.daily_summaries(user_id, date DESC);

-- Índices para histórico de peso
CREATE INDEX IX_weight_history_user_timestamp ON maf.weight_history(user_id, timestamp DESC);

-- Índices para conquistas
CREATE INDEX IX_user_achievements_user_id ON maf.user_achievements(user_id);

-- ================================================
-- INSERIR DADOS INICIAIS
-- ================================================

-- Tipos de conquistas iniciais
INSERT INTO maf.achievement_types (name, description, icon, category, condition_type, condition_value, points) VALUES
('Primeira Refeição', 'Registrou sua primeira refeição', '🍽️', 'nutrition', 'count', 1, 10),
('Semana Completa', 'Registrou refeições por 7 dias consecutivos', '📅', 'nutrition', 'streak', 7, 50),
('Hidratado', 'Bebeu 2L de água em um dia', '💧', 'hydration', 'target', 2000, 20),
('Primeiro Exercício', 'Registrou seu primeiro exercício', '💪', 'exercise', 'count', 1, 15),
('Atleta', 'Completou 30 exercícios', '🏆', 'exercise', 'count', 30, 100),
('Meta de Peso', 'Atingiu o peso meta', '⚖️', 'weight', 'target', 1, 200);

-- Alimentos básicos para começar
INSERT INTO maf.foods (name, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, category, is_verified) VALUES
('Aveia em flocos', 379, 13.8, 67.7, 6.5, 'Cereais', 1),
('Banana nanica', 87, 1.1, 22.3, 0.3, 'Frutas', 1),
('Peito de frango grelhado', 195, 32.8, 0, 5.5, 'Carnes', 1),
('Arroz branco cozido', 130, 2.7, 28.2, 0.3, 'Cereais', 1),
('Feijão carioca cozido', 76, 4.8, 13.6, 0.5, 'Leguminosas', 1),
('Ovo de galinha', 155, 13.3, 1.6, 10.6, 'Ovos', 1),
('Leite integral', 61, 3.2, 4.3, 3.5, 'Laticínios', 1),
('Pão francês', 300, 8.9, 58.6, 3.8, 'Panificados', 1),
('Maçã', 52, 0.2, 13.8, 0.2, 'Frutas', 1),
('Batata doce cozida', 77, 1.3, 18.4, 0.1, 'Tubérculos', 1);

-- ================================================
-- VIEWS ÚTEIS PARA RELATÓRIOS
-- ================================================

-- View para resumo nutricional diário
CREATE VIEW maf.v_daily_nutrition AS
SELECT 
    u.id as user_id,
    u.name as user_name,
    CAST(m.timestamp AS DATE) as date,
    SUM(m.total_calories) as total_calories,
    SUM(m.total_protein) as total_protein,
    SUM(m.total_carbs) as total_carbs,
    SUM(m.total_fat) as total_fat,
    COUNT(m.id) as total_meals
FROM maf.users u
LEFT JOIN maf.meals m ON u.id = m.user_id
GROUP BY u.id, u.name, CAST(m.timestamp AS DATE);
GO

-- View para resumo de hidratação diária
CREATE VIEW maf.v_daily_hydration AS
SELECT 
    u.id as user_id,
    u.name as user_name,
    CAST(w.timestamp AS DATE) as date,
    SUM(w.amount) as total_water_ml,
    COUNT(w.id) as total_intakes
FROM maf.users u
LEFT JOIN maf.water_intake w ON u.id = w.user_id
GROUP BY u.id, u.name, CAST(w.timestamp AS DATE);
GO

-- ================================================
-- PROCEDURES ÚTEIS
-- ================================================

-- Procedure para calcular metas nutricionais
CREATE PROCEDURE maf.sp_calculate_nutrition_goals
    @user_id UNIQUEIDENTIFIER
AS
BEGIN
    DECLARE @weight DECIMAL(5,2), @height INT, @age INT, @gender NVARCHAR(10), @activity_level NVARCHAR(20), @goal NVARCHAR(20)
    DECLARE @bmr DECIMAL(8,2), @activity_multiplier DECIMAL(3,2), @daily_calories INT
    DECLARE @daily_protein DECIMAL(6,2), @daily_fat DECIMAL(6,2), @daily_carbs DECIMAL(6,2)
    
    -- Buscar dados do perfil
    SELECT @weight = current_weight, @height = height, @age = age, @gender = gender, 
           @activity_level = activity_level, @goal = goal
    FROM maf.user_profiles 
    WHERE user_id = @user_id
    
    -- Calcular TMB (Taxa Metabólica Basal)
    IF @gender = 'male'
        SET @bmr = 88.362 + (13.397 * @weight) + (4.799 * @height) - (5.677 * @age)
    ELSE
        SET @bmr = 447.593 + (9.247 * @weight) + (3.098 * @height) - (4.330 * @age)
    
    -- Multiplicador de atividade
    SET @activity_multiplier = CASE @activity_level
        WHEN 'sedentary' THEN 1.2
        WHEN 'light' THEN 1.375
        WHEN 'moderate' THEN 1.55
        WHEN 'active' THEN 1.725
        ELSE 1.2
    END
    
    SET @daily_calories = @bmr * @activity_multiplier
    
    -- Ajustar baseado no objetivo
    IF @goal = 'lose_weight'
        SET @daily_calories = @daily_calories - 500
    ELSE IF @goal = 'gain_weight'
        SET @daily_calories = @daily_calories + 500
    
    -- Calcular macronutrientes
    SET @daily_protein = @weight * 2 -- 2g por kg
    SET @daily_fat = (@daily_calories * 0.25) / 9 -- 25% das calorias
    SET @daily_carbs = (@daily_calories - (@daily_protein * 4) - (@daily_fat * 9)) / 4
    
    -- Desativar metas antigas
    UPDATE maf.nutrition_goals SET is_active = 0 WHERE user_id = @user_id
    
    -- Inserir novas metas
    INSERT INTO maf.nutrition_goals (user_id, daily_calories, daily_protein, daily_carbs, daily_fat)
    VALUES (@user_id, @daily_calories, @daily_protein, @daily_carbs, @daily_fat)
END
GO

-- ================================================
-- TRIGGERS PARA AUDITORIA
-- ================================================

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER tr_users_updated_at ON maf.users
AFTER UPDATE AS
BEGIN
    UPDATE maf.users 
    SET updated_at = GETDATE()
    FROM maf.users u
    INNER JOIN inserted i ON u.id = i.id
END
GO

CREATE TRIGGER tr_user_profiles_updated_at ON maf.user_profiles
AFTER UPDATE AS
BEGIN
    UPDATE maf.user_profiles 
    SET updated_at = GETDATE()
    FROM maf.user_profiles up
    INNER JOIN inserted i ON up.id = i.id
END
GO

-- ================================================
-- SCRIPT CONCLUÍDO
-- ================================================

PRINT 'Schema maf criado com sucesso!'
PRINT 'Tabelas criadas: users, user_profiles, nutrition_goals, meals, foods, meal_foods,'
PRINT 'exercises, water_intake, weight_history, achievement_types, user_achievements,'
PRINT 'ai_insights, daily_summaries, user_settings, integrations'
PRINT 'Views criadas: v_daily_nutrition, v_daily_hydration'
PRINT 'Procedures criadas: sp_calculate_nutrition_goals'
PRINT 'Dados iniciais inseridos: achievement_types, foods'