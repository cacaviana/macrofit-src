-- Dashboard do dia
SELECT * FROM maf.v_goals_vs_actual 
WHERE user_id = 1 AND date = '2025-10-07'

-- Progresso da semana
SELECT * FROM maf.v_weekly_progress 
WHERE user_id = 1 AND year = 2025 AND week = 40

-- Últimos 7 dias
SELECT * FROM maf.v_daily_nutrition 
WHERE user_id = 1 AND date >= DATEADD(day, -7, GETDATE())