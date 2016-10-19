from django.shortcuts import get_object_or_404, reverse
from django.views.generic import DetailView
from django.views.generic.edit import CreateView, UpdateView, FormView
from .forms import FormEscuelaCrear, ContactoForm, BuscarEscuelaForm
from .models import Escuela, EscContacto
from .mixins import ContactoContextMixin
from apps.mye.forms import EscuelaCooperanteForm, EscuelaProyectoForm
from apps.mye.models import EscuelaCooperante, EscuelaProyecto
from apps.main.models import Municipio
from braces.views import LoginRequiredMixin, GroupRequiredMixin, PermissionRequiredMixin
from dal import autocomplete


class EscuelaCrear(LoginRequiredMixin, GroupRequiredMixin, CreateView):
    group_required = u"Administración"
    template_name = 'escuela/add.html'
    raise_exception = True
    redirect_unauthenticated_users = True
    form_class = FormEscuelaCrear


class EscuelaDetail(LoginRequiredMixin, DetailView):
    template_name = 'escuela/detail.html'
    model = Escuela


class EscuelaCooperanteUpdate(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
    model = Escuela
    form_class = EscuelaCooperanteForm
    template_name = 'mye/cooperante_asignacion_escuela.html'
    permission_required = 'mye.change_escuela_cooperante'
    redirect_unauthenticated_users = True
    raise_exception = True

    def get_form(self, *args, **kwargs):
        eliminar = self.request.user.has_perm('mye.delete_escuela_cooperante')
        form = self.form_class(eliminar=eliminar, **self.get_form_kwargs())
        form.initial['cooperante_asignado'] = [c.cooperante for c in EscuelaCooperante.objects.filter(escuela=self.object, activa=True)]
        return form

    def get_success_url(self):
        return reverse('escuela_detail', kwargs={'pk': self.kwargs['pk']})


class EscuelaProyectoUpdate(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
    model = Escuela
    form_class = EscuelaProyectoForm
    template_name = 'mye/proyecto_asignacion_escuela.html'
    permission_required = 'mye.change_escuela_proyecto'
    redirect_unauthenticated_users = True
    raise_exception = True

    def get_form(self, *args, **kwargs):
        eliminar = self.request.user.has_perm('mye.delete_escuela_proyecto')
        form = self.form_class(eliminar=eliminar, **self.get_form_kwargs())
        form.initial['proyecto_asignado'] = [c.proyecto for c in EscuelaProyecto.objects.filter(escuela=self.object, activa=True)]
        return form

    def get_success_url(self):
        return reverse('escuela_detail', kwargs={'pk': self.kwargs['pk']})


class EscuelaEditar(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
    permission_required = "escuela.change_escuela"
    model = Escuela
    template_name = 'escuela/add.html'
    form_class = FormEscuelaCrear
    raise_exception = True
    redirect_unauthenticated_users = True


class EscContactoCrear(LoginRequiredMixin, ContactoContextMixin, CreateView):
    template_name = 'escuela/contacto.html'
    model = EscContacto
    form_class = ContactoForm
    success_url = 'escuela_add'

    def get_initial(self):
        escuela = get_object_or_404(Escuela, id=self.kwargs.get('id_escuela'))
        return{'escuela': escuela}


class EscContactoEditar(LoginRequiredMixin, ContactoContextMixin, UpdateView):
    template_name = 'escuela/contacto.html'
    model = EscContacto
    form_class = ContactoForm

    def get_success_url(self):
        return reverse('escuela_detail', kwargs={'pk': self.object.escuela})


class EscuelaBuscar(LoginRequiredMixin, FormView):
    form_class = BuscarEscuelaForm
    template_name = 'escuela/buscar.html'


class EscuelaBuscarBackend(autocomplete.Select2QuerySetView):
    def get_paginate_by(self, queryset):
        return None

    def has_more(self, context):
        return False

    def get_result_label(self, result):
        return {
            'url': result.get_absolute_url(),
            'codigo': result.codigo,
            'nombre': result.nombre,
            'direccion': result.direccion,
            'municipio': result.municipio.nombre,
            'departamento': result.municipio.departamento.nombre,
        }

    def get_queryset(self):
        qs = Escuela.objects.all()

        codigo = self.forwarded.get('codigo', None)
        direccion = self.forwarded.get('direccion', None)
        municipio = self.forwarded.get('municipio', None)
        departamento = self.forwarded.get('departamento', None)
        cooperante = self.forwarded.get('cooperante', None)
        proyecto = self.forwarded.get('proyecto', None)

        if codigo:
            qs = qs.filter(codigo=codigo)
        if direccion:
            qs = qs.filter(direccion__icontains=direccion)
        if departamento:
            qs = qs.filter(municipio__in=Municipio.objects.filter(departamento=departamento))
        if municipio:
            qs = qs.filter(municipio=municipio)
        if cooperante:
            qs = qs.filter(cooperante_asignado__in=cooperante).distinct()
        if proyecto:
            qs = qs.filter(proyecto_asignado__in=proyecto).distinct()

        if self.q:
            qs = qs.filter(nombre__icontains=self.q)
        return qs
