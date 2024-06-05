<script setup>
import { useAuth } from '../composables/useAuth'

const { errores, form, loading, login, validarBlur } = useAuth()
</script>

<template>
  <Toast />
  <div
    class="surface-ground flex align-items-center justify-content-center min-w-screen overflow-hidden"
    id="div-global"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <div id="div-form">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 15px">
          <div class="text-center mb-6">
            <div class="text-900 text-3xl font-medium mb-3">¡Bienvenido/a!</div>
            <span class="text-600 font-medium">Inicia sesión para continuar</span>
          </div>

          <form @submit.prevent="login">
            <div class="mb-5">
              <span class="p-float-label">
                <InputText
                  id="correo"
                  v-model.trim="form.email"
                  type="text"
                  class="w-full md:w-30rem"
                  :class="{ 'p-invalid': errores.correo }"
                  aria-describedby="text-error"
                  @blur="validarBlur"
                />
                <label for="correo">Correo electrónico</label>
              </span>
              <small class="p-error" id="text-error">{{ errores.correo || '&nbsp;' }}</small>
            </div>

            <div class="mb-5">
              <span class="p-float-label">
                <InputText
                  id="contrasenia"
                  v-model.trim="form.password"
                  type="password"
                  class="w-full md:w-30rem"
                  :class="{ 'p-invalid': errores.contrasenia }"
                  aria-describedby="text-error"
                  @blur="validarBlur"
                />
                <label for="value">Contraseña</label>
              </span>
              <small class="p-error" id="text-error">{{ errores.contrasenia || '&nbsp;' }}</small>
            </div>

            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                >¿Olvidaste tu contraseña?</a
              >
            </div>
            <Button
              type="submit"
              :loading="loading"
              label="Iniciar Sesión"
              class="w-full p-3 text-xl"
            ></Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#div-global {
  height: 90vh;
}

#div-form {
  border-radius: 20px;
  padding: 0.3rem;
  background: linear-gradient(360deg, #3b83f67e, rgba(33, 150, 243, 0) 30%);
}

.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
