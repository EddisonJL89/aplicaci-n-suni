from django import forms
from apps.inventario import models as inv_m


class TecladoForm(forms.ModelForm):
    class Meta:
        model = inv_m.Teclado
        fields = '__all__'
        exclude = ['indice', 'entrada', 'tipo']
        widgets = {
            'codigo_qr': forms.URLInput(attrs={'class': 'form-control'})
                   }


class DispositivoFallaForm(forms.ModelForm):
    class Meta:
        model = inv_m.DispositivoFalla
        fields = ('dispositivo', 'descripcion_falla',)
        widgets = {
            'dispositivo': forms.HiddenInput(),
            'descripcion_falla': forms.Textarea(attrs={'class': 'form-control'})
        }


class SolicitudMovimientoCreateForm(forms.ModelForm):
    """Formulario para el control de las Solicitud de Movimiento de la empresa.
    """
    class Meta:
        model = inv_m.SolicitudMovimiento
        exclude = ['autorizada_por', 'terminada', 'creada_por']
        widgets = {
            'etapa_inicial': forms.Select(attrs={'class': 'form-control '}),
            'etapa_final': forms.Select(attrs={'class': 'form-control '}),
            'tipo_dispositivo': forms.Select(attrs={'class': 'form-control'}),
            'cantidad': forms.TextInput({'class': 'form-control'}),
            'fecha_creacion': forms.DateInput(attrs={'class': 'form-control datepicker', 'format': '%d/%m/%Y'}),
        }

    def __init__(self, *args, **kwargs):
        super(SolicitudMovimientoCreateForm, self).__init__(*args, **kwargs)
        self.fields['tipo_dispositivo'].queryset = inv_m.DispositivoTipo.objects.filter(usa_triage=True)
