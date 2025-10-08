import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { environment } from '$lib/config/environment.js';

/**
 * 🔒 Guard de Autenticação Injetável - MacroFit
 * 
 * Uso: const { isAuthenticated, isChecking } = useAuthGuard();
 * 
 * Comportamentos por ambiente (.env):
 * - dev: Sem autenticação (acesso livre)
 * - accp: Verifica token no localStorage  
 * - prod: Verifica httpOnly cookies via API
 * 
 * BLOQUEIA a renderização até verificar autenticação!
 */
export function useAuthGuard() {
  const authMode = environment.authMode;
  
  // Estados reativos
  const isAuthenticated = writable(authMode === 'dev'); // Dev sempre true
  const isChecking = writable(authMode !== 'dev'); // Dev não precisa checar
  
  onMount(async () => {
    if (!browser) return; // Proteção SSR
    
    switch (authMode) {
      case 'dev':
        // Dev: Passa direto - sem verificação
        console.log('🔓 DEV Mode: Acesso liberado para desenvolvimento');
        isAuthenticated.set(true);
        isChecking.set(false);
        break;
        
      case 'accp':
        // ACCP: Verifica localStorage
        await checkAccpAuth();
        break;
        
      case 'prod':
        // PROD: Verifica httpOnly cookies
        await checkProdAuth();
        break;
        
      default:
        console.warn('⚠️ AUTH_MODE inválido:', authMode);
        isAuthenticated.set(false);
        isChecking.set(false);
        goto('/auth/login');
    }
  });
  
  async function checkAccpAuth() {
    try {
      const token = localStorage.getItem('macrofit_access_token');
      
      if (!token) {
        console.log('🔒 ACCP Mode: Token não encontrado no localStorage');
        isAuthenticated.set(false);
        isChecking.set(false);
        goto('/auth/login');
        return;
      }
      
      console.log('✅ ACCP Mode: Autenticado via localStorage');
      isAuthenticated.set(true);
      isChecking.set(false);
      
    } catch (error) {
      console.error('🔒 ACCP Mode: Erro na verificação -', error);
      isAuthenticated.set(false);
      isChecking.set(false);
      goto('/auth/login');
    }
  }
  
  async function checkProdAuth() {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include', // Inclui httpOnly cookies
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.log('🔒 PROD Mode: Verificação falhou -', response.status);
        isAuthenticated.set(false);
        isChecking.set(false);
        goto('/auth/login');
        return;
      }
      
      console.log('✅ PROD Mode: Autenticado via httpOnly cookies');
      isAuthenticated.set(true);
      isChecking.set(false);
      
    } catch (error) {
      console.log('🔒 PROD Mode: Erro na verificação -', error.message);
      isAuthenticated.set(false);
      isChecking.set(false);
      goto('/auth/login');
    }
  }
  
  return {
    isAuthenticated,
    isChecking
  };
}

/**
 * 🛠️ Utilitários de autenticação
 */
export const AuthUtils = {
  /**
   * Pega dados do usuário atual baseado no modo
   */
  getCurrentUser() {
    const authMode = environment.authMode;
    
    switch (authMode) {
      case 'dev':
        return { 
          id: 'dev-user', 
          email: 'maria@macrofit.com', 
          name: 'Maria Silva',
          premium: true
        };
        
      case 'accp':
        const userData = localStorage.getItem('macrofit_user');
        return userData ? JSON.parse(userData) : null;
        
      case 'prod':
        // Em prod, dados vêm da API
        return null;
        
      default:
        return null;
    }
  },
  
  /**
   * Faz logout baseado no modo
   */
  async logout() {
    const authMode = environment.authMode;
    
    switch (authMode) {
      case 'dev':
        console.log('🔓 DEV Mode: Logout simulado');
        break;
        
      case 'accp':
        localStorage.removeItem('macrofit_access_token');
        localStorage.removeItem('macrofit_user');
        console.log('🔒 ACCP Mode: localStorage limpo');
        break;
        
      case 'prod':
        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        });
        console.log('🔒 PROD Mode: Logout via API');
        break;
    }
    
    goto('/auth/login');
  }
};
