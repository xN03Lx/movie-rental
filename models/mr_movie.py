# -*- coding: utf-8 -*-
from odoo import models, fields

class MrMovie(models.Model):
    _name = 'mr.movie'

    name = fields.Char("name")
    categories = fields.Many2many("mr.category")
    year = fields.Integer("year")
    description = fields.Char("description")
    types = fields.Many2many("mr.type")
