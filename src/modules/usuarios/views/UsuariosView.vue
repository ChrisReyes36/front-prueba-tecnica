<script setup>
import { onMounted, onBeforeMount } from 'vue'
import { useUsuarios } from '../composables/useUsuarios'

const {
  abrirModal,
  cerrarModal,
  confirmarEliminado,
  editarUsuario,
  eliminarUsuarioDialog,
  filters,
  guardarUsuario,
  iniciarFiltros,
  obtenerUsuarios,
  usuarioForm,
  usuarioDialog,
  usuarios,
  submitted,
  eliminarUsuario,
  roles,
  obtenerRoles
} = useUsuarios()

onBeforeMount(() => {
  iniciarFiltros()
})
onMounted(async () => {
  await obtenerUsuarios()
  await obtenerRoles()
})
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button
                label="Nuevo usuario"
                icon="pi pi-plus"
                class="mr-2"
                severity="success"
                @click="abrirModal"
              />
            </div>
          </template>
        </Toolbar>

        <DataTable
          :value="usuarios"
          dataKey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} registros"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">Usuarios</h5>
              <span class="flex mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
              </span>
            </div>
          </template>

          <Column
            field="name"
            header="Nombre"
            :sortable="true"
            headerStyle="width:30%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Nombre</span>
              {{ slotProps.data.name }}
            </template>
          </Column>

          <Column
            field="email"
            header="Correo electrónico"
            :sortable="true"
            headerStyle="width:30%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Correo electrónico"</span>
              {{ slotProps.data.email }}
            </template>
          </Column>

          <Column
            field="roles"
            header="Rol"
            :sortable="true"
            headerStyle="width:30%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Rol</span>
              {{ slotProps.data.roles[0]?.name }}
            </template>
          </Column>

          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="mr-2"
                severity="success"
                rounded
                @click="editarUsuario(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="mt-2"
                severity="warning"
                rounded
                @click="confirmarEliminado(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>

        <Dialog
          v-model:visible="usuarioDialog"
          :style="{ width: '450px' }"
          header="Detalle permiso"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="name">Nombre</label>
            <InputText
              id="name"
              v-model.trim="usuarioForm.name"
              required="true"
              autofocus
              :invalid="submitted && !usuarioForm.name"
            />
            <small class="p-invalid" v-if="submitted && !usuarioForm.name"
              >Nombre es obligatorio.
            </small>
          </div>

          <div class="field">
            <label for="email">Correo electrónico</label>
            <InputText
              id="email"
              v-model.trim="usuarioForm.email"
              required="true"
              :invalid="submitted && !usuarioForm.email"
            />
            <small class="p-invalid" v-if="submitted && !usuarioForm.email"
              >Correo electrónico es obligatorio.
            </small>
          </div>

          <div class="field">
            <label for="rol_id">Rol</label>
            <Dropdown
              id="rol_id"
              v-model="usuarioForm.rol_id"
              :options="roles"
              optionLabel="name"
              optionValue="id"
              :filter="true"
              filterPlaceholder="Buscar Rol"
            />
            <small class="p-invalid" v-if="submitted && !usuarioForm.rol_id"
              >Rol es obligatorio.
            </small>
          </div>

          <div class="field">
            <label for="password">Contraseña</label>
            <Password
              id="password"
              v-model.trim="usuarioForm.password"
              :feedback="false"
              :toggleMask="true"
              :invalid="submitted && !usuarioForm.password"
            />
            <small class="p-invalid" v-if="submitted && !usuarioForm.password && !usuarioForm.user_id"
              >Contraseña es obligatoria.
            </small>
          </div>

          <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text="" @click="cerrarModal" />
            <Button label="Guardar" icon="pi pi-check" text="" @click="guardarUsuario" />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="eliminarUsuarioDialog"
          :style="{ width: '450px' }"
          header="Confirmar"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="usuarioForm"
              >¿Estás seguro/a de que quieres eliminar <b>{{ usuarioForm.name }}</b
              >?</span
            >
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" text @click="eliminarUsuarioDialog = false" />
            <Button label="Sí" icon="pi pi-check" text @click="eliminarUsuario" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>
