from django.shortcuts import reverse
from django.views.generic import CreateView, DetailView, ListView, UpdateView
from braces.views import (
    LoginRequiredMixin, GroupRequiredMixin
)
from apps.inventario import models as inv_m
from apps.inventario import forms as inv_f


class DesechoEmpresaCreateView(LoginRequiredMixin, CreateView, GroupRequiredMixin):
    """Vista   para obtener los datos de Entrada mediante una :class:`DesechoEmpresa`
    Funciona  para recibir los datos de un  'DesechoEmpresaForm' mediante el metodo  POST.  y
    nos muestra el template de visitas mediante el metodo GET.
    """
    model = inv_m.DesechoEmpresa
    form_class = inv_f.DesechoEmpresaForm
    template_name = 'inventario/desecho/desechoempresa_form.html'
    group_required = [u"inv_bodega", u"inv_admin", u"inv_monitoreo"]


class DesechoEmpresaDetailView(LoginRequiredMixin, DetailView, GroupRequiredMixin):
    """Para generar detalles de la :class:`DesechoEmpresa`   con sus respectivos campos.
    """
    model = inv_m.DesechoEmpresa
    template_name = 'inventario/desecho/desechoempresa_detail.html'
    group_required = [u"inv_bodega", u"inv_admin", u"inv_monitoreo"]


class DesechoEmpresaListView(LoginRequiredMixin, ListView, GroupRequiredMixin):
    """Listado del :class:`DesechoEmpresa` con sus respectivos datos
    """
    model = inv_m.DesechoEmpresa
    template_name = 'inventario/desecho/desechoempresa_list.html'
    group_required = [u"inv_bodega", u"inv_admin", u"inv_monitoreo"]


class DesechoSalidaCreateView(LoginRequiredMixin, CreateView, GroupRequiredMixin):
    """Vista   para obtener los datos de Entrada mediante una :class:`DesechoSalida`
    Funciona  para recibir los datos de un  'DesechoSalidaForm' mediante el metodo  POST.  y
    nos muestra el template de visitas mediante el metodo GET.
    """
    model = inv_m.DesechoSalida
    form_class = inv_f.DesechoSalidaForm
    template_name = 'inventario/desecho/desechosalida_add.html'
    group_required = [u"inv_bodega", u"inv_admin", u"inv_monitoreo"]

    def get_context_data(self, **kwargs):
        context = super(DesechoSalidaCreateView, self).get_context_data(**kwargs)
        context['desechosalida'] = inv_m.DesechoSalida.objects.all()
        return context


class DesechoSalidaDetailView(LoginRequiredMixin, DetailView, GroupRequiredMixin):
    """Vista encargada de mostrar los detalles de la :class:`SalidaInventario`
    """
    model = inv_m.DesechoSalida
    template_name = 'inventario/desecho/desechosalida_detail.html'
    group_required = [u"inv_bodega", u"inv_admin", u"inv_monitoreo"]

    def get_context_data(self, **kwargs):
        context = super(DesechoSalidaDetailView, self).get_context_data(**kwargs)
        context['desechodetalles'] = inv_m.DesechoDetalle.objects.filter(desecho=self.object.id)
        context['desechodispositivo'] = inv_m.DesechoDispositivo.objects.filter(desecho=self.object.id)
        return context


class DesechoSalidaUpdateView(LoginRequiredMixin, UpdateView, GroupRequiredMixin):
    """Vista para actualizar la :class:`DesechoSalida`. con sus respectios Campos
    """
    model = inv_m.DesechoSalida
    form_class = inv_f.DesechoSalidaUpdateForm
    template_name = 'inventario/desecho/desechosalida_form.html'
    group_required = [u"inv_bodega", u"inv_admin", u"inv_monitoreo"]

    def get_context_data(self, **kwargs):
        context = super(DesechoSalidaUpdateView, self).get_context_data(**kwargs)
        context['DesechoDetalleForm'] = inv_f.DesechoDetalleForm(initial={'desecho': self.object})
        context['DesechoDispositivoForm'] = inv_f.DesechoDispositivoForm(initial={'desecho': self.object})
        return context

    def get_success_url(self):
        return reverse('desechosalida_update', kwargs={'pk': self.object.id})
