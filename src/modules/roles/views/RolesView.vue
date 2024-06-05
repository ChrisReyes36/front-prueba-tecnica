<script setup>
import { onMounted, onBeforeMount } from 'vue'
import { useRoles } from '../composables/useRoles'

const {
  abrirModal,
  cerrarModal,
  confirmarEliminado,
  editarRole,
  eliminarRoleDialog,
  filters,
  guardarRole,
  iniciarFiltros,
  obtenerRoles,
  roleForm,
  roleDialog,
  roles,
  submitted,
  eliminarRole,
  obtenerPermisos,
  permisos
} = useRoles()

onBeforeMount(() => {
  iniciarFiltros()
})
onMounted(async () => {
  await obtenerRoles()
  await obtenerPermisos()
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
                label="Nuevo rol"
                icon="pi pi-plus"
                class="mr-2"
                severity="success"
                @click="abrirModal"
              />
            </div>
          </template>
        </Toolbar>

        <DataTable
          :value="roles"
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
              <h5 class="m-0">Roles</h5>
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
            headerStyle="width:35%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Nombre</span>
              {{ slotProps.data.name }}
            </template>
          </Column>

          <Column
            field="permissions"
            header="Permisos"
            :sortable="true"
            headerStyle="width:35%; min-width:10rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Permisos</span>
              <ul>
                <li v-for="permission in slotProps.data.permissions" :key="permission.id">
                  {{ permission.name }}
                </li>
              </ul>
            </template>
          </Column>

          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="mr-2"
                severity="success"
                rounded
                @click="editarRole(slotProps.data)"
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
          v-model:visible="roleDialog"
          :style="{ width: '450px' }"
          header="Detalle permiso"
          :modal="true"
          class="p-fluid"
        >
          <div class="field">
            <label for="name">Nombre</label>
            <InputText
              id="name"
              v-model.trim="roleForm.name"
              required="true"
              autofocus
              :invalid="submitted && !roleForm.name"
            />
            <small class="p-invalid" v-if="submitted && !roleForm.name"
              >Nombre es obligatorio.
            </small>
          </div>

          <div class="field">
            <label for="permissions">Permisos</label>
            <MultiSelect
              id="permissions"
              v-model="roleForm.permisos"
              :options="permisos"
              optionLabel="name"
              optionValue="id"
              :maxSelectedLabels="5"
              :filter="true"
              filterPlaceholder="Buscar permiso"
            />
            <small class="p-invalid" v-if="submitted && !roleForm.permisos"
              >Permisos es obligatorio.
            </small>
          </div>

          <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text="" @click="cerrarModal" />
            <Button label="Guardar" icon="pi pi-check" text="" @click="guardarRole" />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="eliminarRoleDialog"
          :style="{ width: '450px' }"
          header="Confirmar"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="roleForm"
              >¿Estás seguro/a de que quieres eliminar <b>{{ roleForm.name }}</b
              >?</span
            >
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" text @click="eliminarRoleDialog = false" />
            <Button label="Sí" icon="pi pi-check" text @click="eliminarRole" />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>
