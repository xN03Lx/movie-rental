# -*- coding: utf-8 -*-
from odoo import models, fields

class MrType(models.Model):
    _name = 'mr.type'
    name = fields.Char("name")